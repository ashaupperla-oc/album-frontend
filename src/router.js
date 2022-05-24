import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/albums",
    name: "albums",
    component: () => import("./views/AlbumsList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditAlbum.vue"),
    props: true
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddAlbum.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/addSong",
    name: "addSong",
    component: () => import("./views/AddSong.vue"),
    props: true
  },
  {
    path: "/editSong",
    name: "editSong",
    component: () => import("./views/EditSong.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;