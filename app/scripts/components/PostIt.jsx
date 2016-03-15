import React from 'react'
import classnames from 'classnames'

const PostIt = (props) => {
  render() {

    let color = ('postit-' + props.color)
    let classes = classNames('thumbnail', 'post-it', color)

    return (
      <div className={classes}>
        <div className='caption'>
          <p>{props.name}</p>
          <p>{props.message}</p>
        </div>
      </div>
    )
  }
};

export default PostIt
