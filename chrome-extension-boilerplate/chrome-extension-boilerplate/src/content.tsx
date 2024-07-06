import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";
import React, { useState, useEffect } from "react";
import { IconButton } from "~components/icon";

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [showInputOverlay, setShowInputOverlay] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ text: string; type: 'input' | 'output' }>>([]);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const getThankYouMessage = (): string => {
    return "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.matches('.msg-form__contenteditable[contenteditable="true"][role="textbox"], .msg-form__textarea[role="textbox"], input[type="text"], textarea')) {
        const { bottom, right } = target.getBoundingClientRect();
        setOverlayPosition({
          top: bottom + window.scrollY,
          left: right + window.scrollX - 20
        });
        setTargetElement(target);
      } else {
        setTargetElement(null);
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  const handleIconClick = () => {
    setShowInputOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowInputOverlay(false);
    setInputValue("");
    setMessages([]);
  };

  const handleGenerateClick = () => {
    if (inputValue) {
      setMessages([...messages, { text: inputValue, type: 'input' }, { text: getThankYouMessage(), type: 'output' }]);
    }
  };

  const handleInsertClick = () => {
    const inputField = document.querySelector('.msg-form__contenteditable[contenteditable="true"][role="textbox"], .msg-form__textarea[role="textbox"]');

    if (inputField) {
      const element = inputField as HTMLElement;
      element.focus();
      element.innerText = getThankYouMessage();
      const inputEvent = new Event('input', { bubbles: true });
      element.dispatchEvent(inputEvent);
    } else {
      console.error('Unable to find the LinkedIn input field.');
    }
  };

  const handleRegenerateClick = () => {
    setMessages([...messages, { text: getThankYouMessage(), type: 'output' }]);
  };

  return (
    <>
      {targetElement && (
        <div
          className="fixed z-50 flex justify-center items-center cursor-pointer"
          onClick={handleIconClick}
          style={{
            top: overlayPosition.top - 20,
            left: overlayPosition.left - 20
          }}>
          <IconButton />
        </div>
      )}
      {showInputOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseOverlay}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            style={{ width: '300px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: '14px',
                    color: message.type === 'output' ? 'white' : 'black',
                    backgroundColor: message.type === 'output' ? '#0073b1' : '#f0f0f0',
                    textAlign: message.type === 'output' ? 'left' : 'right',
                    marginBottom: '5px',
                    padding: '8px',
                    borderRadius: '10px',
                    alignSelf: message.type === 'output' ? 'flex-start' : 'flex-end',
                    width: 'fit-content',
                    maxWidth: '70%'
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>
            {!messages.length && (
              <input
                type="text"
                id="textInput"
                placeholder="Your prompt"
                value={inputValue}
                onChange={handleInputChange}
                style={{ padding: '8px', fontSize: '14px', marginBottom: '10px', width: '100%', borderRadius: '5px' }}
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              {!messages.length ? (
                <button
                  onClick={handleGenerateClick}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    flex: 1,
                    backgroundColor: "blue",
                    background: 'rgba(59, 130, 246, 1)',
                    color: "white",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    marginRight: '10px'  // Added marginRight for spacing
                  }}
                  disabled={!inputValue}
                >
                  <span style={{ marginRight: '5px' }}>Generate</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" fill="currentColor" />
                  </svg>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleInsertClick}
                    style={{
                      padding: '8px',
                      fontSize: '14px',
                      flex: 1,
                      border: '2px solid var(--Colors-Gray-500, rgba(102, 109, 128, 1))',
                      borderRadius: '4px',
                      marginRight: '10px',  // Added marginRight for spacing
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 16L6 10H18L12 16Z" fill="currentColor" />
                    </svg>
                    Insert
                  </button>
                  <button
                    onClick={handleRegenerateClick}
                    style={{
                      padding: '8px',
                      fontSize: '14px',
                      flex: 1,
                      background: 'rgba(59, 130, 246, 1)',
                      color: "white",
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8z" fill="currentColor" />
                    </svg>
                    Regenerate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlasmoOverlay;
