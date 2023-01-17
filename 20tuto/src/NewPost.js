import React from 'react'

const NewPost = ( {
   handleSubmit, postTitle, setPostTitle, postBody, setPostBody
} ) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input 
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}          
          /> {/* htmlfor 속성값이랑 id 매칭 */}
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)} 
          cols="30" rows="10">
        </textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost