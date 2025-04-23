import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div style={{ minHeight: '86vh' }}>{children}</div>
            <Footer />
        </>
    )
}

export default Layout
