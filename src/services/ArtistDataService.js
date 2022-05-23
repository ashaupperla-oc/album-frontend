import http from "../http-common";
class ArtistDataService {
  getAllArtists(albumId) {
    return http.get(`/albums/${albumId}/artists`);
  }
  getArtist(albumId,id) {
    return http.get(`/albums/${albumId}/artists/${id}`);
  }
  createArtist(albumId,data) {
    return http.post(`/albums/${albumId}/artists`, data);
  }
  updateArtist(albumId,id, data) {
    return http.put(`/albums/${albumId}/artists/${id}`, data);
  }
  deleteArtist(albumId,id) {
    return http.delete(`/albums/${albumId}/artists/${id}`);
  }

}
export default new ArtistDataService();