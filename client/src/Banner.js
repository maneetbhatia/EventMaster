import styled from "styled-components"
import bannerImg from './Assests/bannerjpg.jpg'

const Banner = () => {
    return(
      <>
        <BannerImg src={bannerImg} alt="banner" />
        <p>Categories</p>
      </>
    )
}

const BannerImg = styled.img`
    width: 100%;
    object-fit: cover;
    object-position: 0px 25%;
    height: 350px;
`

export default Banner;