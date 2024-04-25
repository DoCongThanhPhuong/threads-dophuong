import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import postsAtom from '~/atoms/postAtom'
import Post from '~/components/Post'
import SuggestedUsers from '~/components/SuggestedUsers'
import useShowToast from '~/hooks/useShowToast'

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/posts/feed')
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }

        setPosts(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  }, [showToast, setPosts])

  return (
    <Flex gap="10" alignItems={'flex-start'}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <Text>Follow some users to see the feed</Text>
        )}

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
      </Box>
      <Box
        flex={30}
        display={{
          base: 'none',
          md: 'block'
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  )
}

export default HomePage
