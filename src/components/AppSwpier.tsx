import { Carousel } from 'antd';

/**
 * Swpier - 轮播组件
 * @param props
 * @returns
 */
const AppSwiper = (props: AppSwiperProps) => {
  let links: Array<any> = [];
  const itemStyle = {
    display: 'block',
    width: props.width,
    height: props.height,
  }
  const imgStyle = {
    width: props.width,
    height: props.height,
    display: 'block',
  }
  const onClickHandler=(itemData:IswiperItemData)=>{
    console.log(props)
    props.onClick?.(itemData)
  }

  props.data.forEach((item,index) => {
    const linkItem = typeof item.source == 'string' ? (      
        <img src={item.source} style={imgStyle} />      
    ) : item.source
    links.push(<a key={'swiper'+index} style={itemStyle} onClick={()=>{onClickHandler(item)}}>{linkItem}</a>);
  })

  return (
    <Carousel effect="fade" dotPosition="bottom" dots={{className:"dotStyle"}} autoplay={true}>
      {links}
    </Carousel>
  )
}
export default AppSwiper;
