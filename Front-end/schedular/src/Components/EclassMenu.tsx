import styled from 'styled-components';

const Menu = styled.div`
  position: absolute;
  height: 52rem;
  background-color: #ebebeb;
`;
const MenuItem = styled.div`
  text-align: left;
  font-size: 13px;
  color: #fff;
  padding-left: 10px;
  width: 200px;
  height: 40px;
  border-bottom: 1px solid #999;
  background-color: #67686c;
`;
const MenuTitle = styled.div`
  padding: 10px;
  width: 100%;
  transition: 0.2s;
  &:hover{  
    color: orange;
  }
`;

//memo정민: 이클래스 메뉴 Component
const EclassMenu = () => {

  return (
    <Menu>
      <MenuItem>
        <MenuTitle>학습 목차</MenuTitle>
      </MenuItem>
      <MenuItem>
          <MenuTitle>학습 정보</MenuTitle>
      </MenuItem>
      <MenuItem>
        <MenuTitle>학습 활동 관리</MenuTitle>
      </MenuItem>
      <MenuItem>
        <MenuTitle>학습 활동</MenuTitle>
      </MenuItem>
      <MenuItem>
        <MenuTitle>학습 현황</MenuTitle>
      </MenuItem>
      <MenuItem>
        <MenuTitle>과목 정보</MenuTitle>
      </MenuItem>
      <MenuItem>
        <MenuTitle>성적</MenuTitle>
      </MenuItem>
    </Menu>
  )
}

export default EclassMenu;
