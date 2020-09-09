import React, { useState, useRef } from 'react'
import { MdPhotoCamera } from 'react-icons/md'
import swal from 'sweetalert'
import swalReact from '@sweetalert/with-react'

import { useAuth } from '../../services/auth'
import api from '../../services/api'
import { APIErrorResponse } from '../../types'

import FileGroup from '../FileGroup/Index'

import './styles.scss'

const UpdateAvatar: React.FC = () => {
  const { user } = useAuth()

  const [avatar, setAvatar] = useState<File>()
  const [avatarPreview, setAvatarPreview] = useState<string>('')

  function onAvatarChange (avatar: File) {
    const preview = URL.createObjectURL(avatar)

    console.log(avatarPreview)

    setAvatarPreview(preview)

    console.log(avatarPreview)

    setAvatar(avatar)
  }

  function submitAvatar () {
    const data = new FormData()

    data.append('avatar', avatar as File)

    console.log(avatar)

    api.put(`/users/${user!.id}/avatar`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .catch(error => {
        URL.revokeObjectURL(avatarPreview)
        setAvatar(undefined)
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

  function handleAvatar () {
    swalReact({
      title: 'Change avatar',
      className: 'profile-modal',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: false,
          visible: true,
          className: 'cancel-button',
          closeModal: true
        },
        confirm: {
          text: 'Update avatar',
          value: true,
          className: 'confirm-button',
          closeModal: true
        }
      },
      content: (
        <div className='avatar-container'>
          <div className="preview">
            { avatarPreview !== '' && (
              <img src={avatarPreview} />
            ) }
          </div>

          <FileGroup
            id='avatar'
            label='Choose a image'
            onChange={onAvatarChange}
          />
        </div>
      )
    })
      .then((value: boolean | null) => {
        if (value) {
          submitAvatar()
        } else {
          URL.revokeObjectURL(avatarPreview)
          setAvatar(undefined)
          setAvatarPreview('')
        }
      })
  }

  return (
    <div className="update-avatar">
      { user && (
        <div className="avatar">
          <span
            className="change"
            onClick={handleAvatar}
          >
            <MdPhotoCamera size={20} />
          </span>
          <img src={(avatarPreview !== '') ? avatarPreview : user.avatar} alt={user.name} />
        </div>
      ) }
    </div>
  )
}

export default UpdateAvatar
