import Login from './Login'

function UserOnly() {
  return (
    <>
      <div id ='user-only-banner'className='banner-div'>
        <div className='banner-text-right-to-left'>
          .｡.:*☆ PLEASE LOGIN TO VIEW THIS PAGE  ☆.｡.:*
        </div>
      </div>
      <Login />
    </>
  )
}

export default UserOnly