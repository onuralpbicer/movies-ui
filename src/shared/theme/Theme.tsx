import { useTheme } from './util'

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	useTheme()

	return <>{children}</>
}

export default Theme
