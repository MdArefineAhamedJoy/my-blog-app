import ReactQueryProvider from "@/ReactQueryProvider"
import HomePage from "./client/pages"

const MyApp = () => {
  return (
    <ReactQueryProvider>
      <HomePage></HomePage>
    </ReactQueryProvider>
  )
}
export default MyApp