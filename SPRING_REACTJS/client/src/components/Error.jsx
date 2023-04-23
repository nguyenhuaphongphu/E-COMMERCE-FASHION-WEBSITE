import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://htlit.maytinhhtl.com/images/bai-viet/lam-web/tao-trang-web-bao-loi-cho-website-mang-phong-cach-cua-rieng-ban.png")
      center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
export default function Error() {
  return (
    <Container />
  );
};
