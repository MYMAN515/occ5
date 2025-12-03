import { redirect } from 'next/navigation'

export default function LegacyQuizRedirect() {
  redirect('/quizzes/puberty')
}
