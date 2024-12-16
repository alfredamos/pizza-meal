import { useAuthStore } from "@/stores/auth.store";
import {storeToRefs} from "pinia"

export function adminRoute(to: any, from: any, next: (path?: string) => void){
  const {isAdmin} = storeToRefs(useAuthStore());
  if(isAdmin.value){
    next()
  }else{
    next("/not-allowed");
  }
}