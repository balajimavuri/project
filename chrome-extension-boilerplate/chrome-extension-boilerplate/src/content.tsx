import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { IconButton } from "~components/icon"
import IconOverlay from "~features/IconOverlay"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  // const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  // const [overlayPosition, setOverlayPosition] = useState<{
  //   top: number
  //   left: number
  // }>({ top: 0, left: 0 })
  const [showInputOverlay, setShowInputOverlay] = useState(false)

  // useEffect(() => {
  //   const handleFocus = (event: FocusEvent) => {
  //     const target = event.target as HTMLElement
  //     if (
  //       target.matches(
  //         '.msg-form__contenteditable[contenteditable="true"][role="textbox"]'
  //       )
  //     ) {
  //       const { bottom, right } = target.getBoundingClientRect()
  //       setOverlayPosition({
  //         top: bottom + window.scrollY - 20,
  //         left: right + window.scrollX - 20
  //       })
  //       setTargetElement(target)
  //     } else {
  //       setTargetElement(null)
  //     }
  //   }

  //   document.addEventListener("focusin", handleFocus)
  //   return () => {
  //     document.removeEventListener("focusin", handleFocus)
  //   }
  // }, [])

  // const handleIconClick = () => {
  //   setShowInputOverlay(true)
  // }

  // return targetElement ? (
  //   <div
  //     className="fixed z-50 flex justify-center items-center cursor-pointer"
  //     onClick={handleIconClick}
  //     style={{
  //       top: overlayPosition.top - 20,
  //       left: overlayPosition.left - 20
  //     }}>
  //     <IconButton />
  //   </div>
  // ) : null

  return <IconOverlay></IconOverlay>
}

export default PlasmoOverlay
