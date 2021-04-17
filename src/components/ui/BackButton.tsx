import Link from 'next/link'
import { MdTrendingFlat } from 'react-icons/md'

import '../styles/components/BackButton.module.css'

interface BackButtonProps {
  text: string
  url: string
}

export default function BackButton ({ text, url }: BackButtonProps) {
  return (
    <div className="back-button">
      <Link href={url}>
        <MdTrendingFlat size={30} />
        <span>{ text }</span>
      </Link>
    </div>
  )
}
