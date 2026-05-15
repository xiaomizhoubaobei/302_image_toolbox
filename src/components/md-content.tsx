import React from 'react'
import Markdown from 'react-markdown'


interface PropsData {
  content: any
}

function MdContent({ content }: PropsData) {

  return (
    <div className='w-full overflow-scroll '>
      <Markdown>{content}</Markdown>
    </div>
  )
}

export default MdContent