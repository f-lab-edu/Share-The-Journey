'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from '@nextui-org/react';

import auth from '@/app/auth';
import { AuthContext } from '@/app/AuthContext';

import ChevronDown from '@/icons/chevronDown';

// COM: 모든 페이지의 레이아웃에 각각 헤더가 들어가 있는 것 같은데, 한 번에 삽입할 수도 있겠다.
const Header = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Navbar shouldHideOnScroll className='mt-5 bg-white'>
      <NavbarBrand>
        <h1 className='font-bold text-lg'>Share The Journey</h1>
      </NavbarBrand>
      <NavbarContent className='flex justify-center pl-3 w-[100px]'>
        <NavbarItem isActive>
          <Link aria-current='page' href='/'>
            Home
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                endContent={<ChevronDown fill='currentColor' size={16} />}
                radius='sm'
                variant='light'
              >
                Menu
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu className='w-[200px]' itemClasses={{ base: 'gap-3' }}>
            <DropdownItem
              key='add-place'
              description='나만이 알고있는 특별한 여행지를 공유해보세요.'
              className='text-primary'
              href={user ? '/upload' : '/login'}
            >
              여행지 등록하기
            </DropdownItem>
            <DropdownItem
              key='my-travel'
              description='내가 공유한 여행지를 확인해보세요.'
              className='text-success'
              href={user ? '/myJourney' : '/login'}
            >
              내가 등록한 여행지
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {user && (
        <Button onClick={handleLogout} color='danger'>
          로그아웃
        </Button>
      )}
      {!user && (
        <Button as={Link} color='success' href='/login' size='md'>
          로그인
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
