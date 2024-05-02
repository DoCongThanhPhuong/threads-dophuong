import { Box } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

function CaptureAudio({ hide }) {
  return (
    <Box
      background={'gray.light'}
      width={'95%'}
      p={3}
      borderRadius={4}
      position={'absolute'}
      bottom={0}
      left={6}
      zIndex={40}
    >
      <FaTrash onClick={() => hide()} />
    </Box>
  )
}

export default CaptureAudio
