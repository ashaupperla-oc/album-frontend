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
    path: "/addArtist",
    name: "addArtist",
    component: () => import("./views/AddArtist.vue"),
    props: true
  },
  {
    path: "/editArtist",
    name: "editArtist",
    component: () => import("./views/EditArtist.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;