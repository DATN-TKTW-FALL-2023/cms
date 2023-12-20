/* eslint-disable no-unused-vars */
export enum ACCESS {
  GENERAL = 'GENERAL',
  // User Module
  CREATE_USER = 'CREATE_USER',
  LIST_USERS = 'LIST_USERS',
  VIEW_USER = 'VIEW_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',

  // Deleted User
  LIST_DELETED_USER = 'LIST_DELETED_USER',
  VIEW_DELETED_USER = 'VIEW_DELETED_USER',
  RESTORE_USER = 'RESTORE_USER',

  // Role Module
  LIST_ROLES = 'LIST_ROLES',
  LIST_PERMISSION = 'LIST_PERMISSION',
  CREATE_ROLE = 'CREATE_ROLE',
  VIEW_ROLE = 'VIEW_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',

  // Media Module
  CREATE_MEDIA = 'CREATE_MEDIA',
  LIST_MEDIAS = 'LIST_MEDIAS',
  VIEW_MEDIA = 'VIEW_MEDIA',
  UPDATE_MEDIA = 'UPDATE_MEDIA',
  DELETE_MEDIA = 'DELETE_MEDIA',

  // Taxonomy module
  CREATE_TAXONOMY = 'CREATE_TAXONOMY',
  LIST_TAXONOMY = 'LIST_TAXONOMY',
  VIEW_TAXONOMY = 'VIEW_TAXONOMY',
  UPDATE_TAXONOMY = 'UPDATE_TAXONOMY',
  DELETE_TAXONOMY = 'DELETE_TAXONOMY',

  // Post module
  CREATE_POST = 'CREATE_POST',
  LIST_POST = 'LIST_POST',
  VIEW_POST = 'VIEW_POST',
  UPDATE_POST = 'UPDATE_POST',
  DELETE_POST = 'DELETE_POST',

  // Room module
  LIST_ROOM = 'LIST_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
  VIEW_ROOM = 'VIEW_ROOM',
  UPDATE_ROOM = 'UPDATE_ROOM',
  DELETE_ROOM = 'DELETE_ROOM',
  // Showtime module
  VIEW_SHOWTIME = 'VIEW_SHOWTIME',
  LIST_FILM = 'LIST_FILM',
  CREATE_UPDATE_OPTION= 'CREATE_UPDATE_OPTION',
}
