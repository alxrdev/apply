import React, { useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md'
import swal from 'sweetalert'
import AvatarEditor from 'react-avatar-editor'

import { useAuth } from '../../hooks'
import api from '../../services/api'
import { APIErrorResponse } from '../../types'

import FileGroup from '../FileGroup/Index'
import Button from '../Button'

import './styles.scss'

const UpdateAvatar: React.FC = () => {
  const { user } = useAuth()

  const [avatarPreview, setAvatarPreview] = useState<string>('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  let avatarRef: any // a reference to store the avatar image
  function setAvatarRef (aRef: any) {
    return (avatarRef = aRef)
  }

  function onAvatarChange (avatarFile: File) {
    const preview = URL.createObjectURL(avatarFile)
    setAvatarPreview(preview)
  }

  function onCancelClick () {
    URL.revokeObjectURL(avatarPreview)
    setAvatarPreview('')
    setIsModalOpen(false)
  }

  function onUpdateAvatarClick () {
    const data = avatarRef.getImage().toDataURL()

    setAvatarPreview(data)
    setIsModalOpen(false)

    fetch(data)
      .then(res => res.blob())
      .then(avatar => {
        submitAvatar(avatar)
      })
  }

  function submitAvatar (avatar: Blob) {
    const avatarExtension = avatar.type.split('/')[1]

    const data = new FormData()

    data.append('avatar', avatar, `avatar.${avatarExtension}`)

    api.put(`/users/${user!.id}/avatar`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .catch(error => {
        URL.revokeObjectURL(avatarPreview)
        setAvatarPreview('')

        const data = error.response.data as APIErrorResponse

        if (data.error_status_code === 400) {
          swal({
            title: 'Ops!',
            text: (data.error_details) ? data.error_details[0].constraints : data.error_message,
            icon: 'error',
            className: 'profile-modal'
          })
        } else {
          swal({
            title: 'Ops!',
            text: 'We have a internal server error.',
            icon: 'error',
            className: 'profile-modal'
          })
        }
      })
  }

  return (
    <div className="update-avatar">
      { user && (
        <div className="avatar">
          <span
            className="change"
            onClick={() => setIsModalOpen(true)}
          >
            <MdPhotoCamera size={20} />
          </span>
          <img src={(avatarPreview !== '') ? avatarPreview : user.avatar} alt={user.name} />
        </div>
      ) }

      { isModalOpen && (
        <div className="avatar-change-modal">
          <div className='avatar-container'>
            <div className="preview">
              { avatarPreview !== '' && (
                <AvatarEditor
                  ref={setAvatarRef}
                  image={avatarPreview}
                  width={250}
                  height={250}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1.2}
                  rotate={0}
                />
              ) }
            </div>

            <FileGroup
              id='avatar'
              label='Choose a image'
              onChange={onAvatarChange}
            />

            <div className="buttons">
              <Button
                type='dark'
                content='Cancel'
                onClick={onCancelClick}
              />
              <Button
                type='primary'
                content='Update avatar'
                onClick={onUpdateAvatarClick}
              />
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

export default UpdateAvatar
