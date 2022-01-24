import React from 'react'

function Home() {
  const [isChangingNewIn, setIsChangingNewIn] = React.useState(true)

  const handleClick = () => {
    setIsChangingNewIn(!isChangingNewIn)
  }

  console.log(isChangingNewIn)

  return (
    <>
      <div className="home-page-first-section">
        <div className="home-page-split-left">
          <img src="https://i.imgur.com/Q6Py7E4.jpg" />
        </div>
        <div className="home-page-split-right">
          {isChangingNewIn ? (
            <>
              <p>Ashley Williams</p>
              <img id="right-img" src="https://i.imgur.com/HdSlTC9.jpg" />
            </>
          ) : (
            <>
              <p>Miaou</p>
              <img id="right-img" src="https://i.imgur.com/cC2eIsp.jpg" />
            </>
          )}
          <p onClick={handleClick}>Click Me 🦋</p>
        </div>
      </div>
    </>
  )
}

export default Home