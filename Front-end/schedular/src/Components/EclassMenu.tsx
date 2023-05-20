import styled from 'styled-components';
import { useState} from "react";

const Menu = styled.div`
  position: absolute;
  height: 90%;
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
const SubMenuWapper = styled.div`
  position: absolute;
  left: 210px;
  top: 122px;
  width: 180px;
  border-radius: 0 8px 8px 0;
  background-color: #9fa4b1;
`;
const SubMenuItem = styled.div`
  text-align: left;
  font-size: 13px;
  color: #000;
  margin-left: 8px;
  width: 160px;
  height: 40px;
  border-bottom: 1px solid #999;
  background-color: #9fa4b1;
`;
const SubMenuTitle = styled.div`
  padding: 10px;
  width: 100%;
  transition: 0.25s;
  &:hover{  
    color: #fff;
  }
`;

const EclassMenu = () => {
  const [ isHovering, setIsHovering ] = useState(false);

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
        <MenuTitle onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>학습 활동</MenuTitle>
        { isHovering ? (
          <SubMenuWapper  onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            <SubMenuItem><SubMenuTitle>출석</SubMenuTitle></SubMenuItem>
            <SubMenuItem><SubMenuTitle>과제</SubMenuTitle></SubMenuItem>
            <SubMenuItem><SubMenuTitle>토론</SubMenuTitle></SubMenuItem>
            <SubMenuItem><SubMenuTitle>시험</SubMenuTitle></SubMenuItem>
            <SubMenuItem><SubMenuTitle>설문</SubMenuTitle></SubMenuItem>
            <SubMenuItem><SubMenuTitle>팀활동</SubMenuTitle></SubMenuItem>
          </SubMenuWapper> ) : ( "")}
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
