import './App.css'
import{BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import CreateListing from './Pages/CreateListing'
import ListingDetail from './Pages/ListingDetail'
import TripList from './Pages/TripList'
import WishList from './Pages/wishList'
import PropertyList from './Pages/PropertyList'
import ReservationList from './Pages/ReservationList'
import CategoryPage from './Pages/CategoryPage'
import SearchPage from './Pages/SearchPage'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="create-listing" element={<CreateListing/>}/>
            <Route path="properties/:listingId" element={<ListingDetail/>}/>
            <Route path="properties/category/:category" element={<CategoryPage/>}/>
            <Route path="/properties/search/:search" element={<SearchPage />} />
            <Route path="/:userId/trips" element={<TripList/>}/>
            <Route path="/:userId/wishList" element={<WishList/>}/>
            <Route path="/:userId/properties" element={<PropertyList/>}/>
            <Route path="/:userId/reservations" element={<ReservationList/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
