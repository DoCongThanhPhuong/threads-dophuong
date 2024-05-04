import { useRecoilValue } from 'recoil'
import LoginCard from '~/components/LoginCard'
import SignupCard from '~/components/SignupCard'
import ForgotPasswordCard from '~/components/ForgotPasswordCard'
import authScreenAtom from '~/atoms/authAtom'

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom)

  const components = {
    login: <LoginCard />,
    signup: <SignupCard />,
    forgotPassword: <ForgotPasswordCard />
  }

  return components[authScreenState] || null
}

export default AuthPage
