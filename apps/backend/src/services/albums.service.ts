import axios from "axios";
import {Album} from "@mubite/types";

export async function getAlbums(): Promise<Album[]> {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
    );
    return response.data;
}