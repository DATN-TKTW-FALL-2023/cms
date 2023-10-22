import lazyLoading from '@src/components/widgets/LazyLoading'
import { ACCESS } from '@src/configs/permission'
import DetailLayoutRoom from '@src/pages/room/layout/detail'
import React from 'react'
import { PathRouteProps } from 'react-router-dom'

export interface TRouteConfig extends PathRouteProps {
  Element: React.FC
  key: ACCESS
}

const Dashboard = lazyLoading(() => import('@pages/dashboard'))

const Role = lazyLoading(() => import('@pages/role'))

const User = lazyLoading(() => import('@pages/user'))
const CreateUser = lazyLoading(() => import('@pages/user/create'))
const DetailUser = lazyLoading(() => import('@pages/user/detail'))

const Media = lazyLoading(() => import('@pages/media'))

const Post = lazyLoading(() => import('@pages/post'))
const CreatePost = lazyLoading(() => import('@pages/post/create'))
const DetailPost = lazyLoading(() => import('@pages/post/detail'))
const Category = lazyLoading(() => import('@pages/post/category'))
const LayoutRoom = lazyLoading(() => import('@pages/room/layout'))
const Room = lazyLoading(() => import('@pages/room'))
const CreateRoom = lazyLoading(() => import('@pages/room/create'))
const CreateLayoutRoom = lazyLoading(() => import('@pages/room/layout/create'))
const CreateCategory = lazyLoading(() => import('@pages/post/category/create'))
const DetailCategory = lazyLoading(() => import('@pages/post/category/detail'))
const DetailRoom = lazyLoading(() => import('@pages/room/detail'))
const RoomSeats = lazyLoading(() => import('@pages/room/seats'))
const CreateFilm = lazyLoading(() => import('@pages/film/create'))

const routeConfig: TRouteConfig[] = [
  {
    path: '/',
    Element: Dashboard,
    key: ACCESS.GENERAL,
  },

  // Role
  {
    path: '/role',
    Element: Role,
    key: ACCESS.LIST_ROLES,
  },
  {
    path: '/create-role',
    Element: Role,
    key: ACCESS.CREATE_ROLE,
  },
  {
    path: '/role/:id',
    Element: Role,
    key: ACCESS.VIEW_ROLE,
  },

  // User
  {
    path: '/user',
    Element: User,
    key: ACCESS.LIST_USERS,
  },
  {
    path: '/create-user',
    Element: CreateUser,
    key: ACCESS.CREATE_USER,
  },
  {
    path: '/detail-user/:id',
    Element: DetailUser,
    key: ACCESS.VIEW_USER,
  },

  // Media
  {
    path: '/media',
    Element: Media,
    key: ACCESS.LIST_MEDIAS,
  },

  // Post
  {
    path: '/post',
    Element: Post,
    key: ACCESS.LIST_POST,
  },
  {
    path: '/create-post',
    Element: CreatePost,
    key: ACCESS.CREATE_POST,
  },
  {
    path: '/detail-post/:id',
    Element: DetailPost,
    key: ACCESS.VIEW_POST,
  },
  {
    path: '/category',
    Element: Category,
    key: ACCESS.LIST_TAXONOMY,
  },
  {
    path: '/create-category',
    Element: CreateCategory,
    key: ACCESS.LIST_TAXONOMY,
  },
  {
    path: '/detail-category/:id',
    Element: DetailCategory,
    key: ACCESS.LIST_TAXONOMY,
  },

  //room
  {
    path: '/layout-room',
    Element: LayoutRoom,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/create-layout-room',
    Element: CreateLayoutRoom,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/layout-room/:id',
    Element: DetailLayoutRoom,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/room',
    Element: Room,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/create-room',
    Element: CreateRoom,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/room/:id',
    Element: DetailRoom,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/room/:id/seats',
    Element: RoomSeats,
    key: ACCESS.LIST_ROOM,
  },
  {
    path: '/create-film',
    Element: CreateFilm,
    key: ACCESS.LIST_ROOM,
  }
]

export default routeConfig
