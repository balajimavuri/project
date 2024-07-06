import { CountButton } from "~features/CountButton"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <h1>Content</h1>
      <CountButton />
    </div>
  )
}

export default IndexPopup
