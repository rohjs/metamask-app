import { FC, useEffect, useRef, useState } from 'react'
import store from 'store'
import cx from 'classnames'

import { Avatar } from './Avatar'

type UserMenuProps = {
  address: string
}

export const UserMenu: FC<UserMenuProps> = ({ address }) => {
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const togglePopup = () => {
    setShowPopup((prev) => !prev)
  }

  const closePopupOnBlur = (e: MouseEvent) => {
    if (!popupRef?.current?.contains(e.target as Node)) {
      setShowPopup(false)
    }
  }

  const disconnect = () => {
    store.remove(`meta.account`)
    window.location.reload()
  }

  useEffect(() => {
    if (!showPopup) return
    window.addEventListener('click', closePopupOnBlur)

    return () => {
      window.removeEventListener('click', closePopupOnBlur)
    }
  }, [showPopup])

  return (
    <div className="userMenu" ref={popupRef}>
      <button onClick={togglePopup} type="button">
        <Avatar address={address} />
      </button>

      <div className={cx('userMenuPopup', { show: showPopup })}>
        <button onClick={disconnect} type="button">
          Disconnect
        </button>
      </div>
    </div>
  )
}
