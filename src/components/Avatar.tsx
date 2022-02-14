import { FC } from 'react'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/pixel-art-neutral'

type AvatarProps = {
  address: string
}

export const Avatar: FC<AvatarProps> = ({ address }) => {
  const svg = createAvatar(style, { seed: address })

  return <div dangerouslySetInnerHTML={{ __html: svg }} />
}
