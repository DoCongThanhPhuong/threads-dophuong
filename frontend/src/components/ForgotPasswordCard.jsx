import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import useShowToast from '~/hooks/useShowToast'

function ForgottenPasswordPage() {
  const [email, setEmail] = useState('')
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      showToast('Success', data.message, 'success')
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Forgot Password
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
          w={{
            base: 'full',
            sm: '400px'
          }}
        >
          <Stack spacing={4}>
            <Text fontSize={'sm'}>
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </Text>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Sending"
                size="lg"
                bg={useColorModeValue('gray.600', 'gray.700')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.700', 'gray.800')
                }}
                onClick={handleForgotPassword}
                isLoading={loading}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default ForgottenPasswordPage
