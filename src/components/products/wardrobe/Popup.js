function Popup({ handleClose, startAgain }) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        <div className="popup-para">
          <p className="popup-title">How it works</p>
          <p>1. Add products to your wardrobe from our shop</p>
          <p>2. Drag the products you want to try into the <em>try on</em> section &#91;in the dotted lines&#93;</p>
          <p>3. Make cute outfits :&#41;</p>
          <p className="popup-title" id='note-from-holly'>A note from Holly</p>
          <p>🦋 You can only try 4 products at a time.</p>
          <p>🧚‍♀️ I recommend trying on a top, a bottom, an accessory and a pair of shoes.</p>
          <p>✨ If you want to create a new outfit click <span id='start-again' onClick={startAgain}>
            start again</span>.
          </p>
          <p>🍄 I&#39;m currently working on a new feature that saves the outfits you create to your account but for now please screenshot anything you don&#39;t want to lose.｡.:*☆</p>
        </div>
      </div>
    </div>
  )
}

export default Popup