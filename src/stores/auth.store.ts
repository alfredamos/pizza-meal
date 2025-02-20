import type { UserPayload } from "@/models/users/userPayload.model";
import { AuthState } from "@/states/authState";
import { defineStore } from "pinia";
import { ref, computed, onMounted} from "vue";

export const useAuthStore = defineStore("auth", () => {
  //----> State.
  const authState = ref<AuthState>(new AuthState());

  //----> onMounted behaves like a constructor.
  onMounted(async() => {
    getAuthLocal();
  })

  //----> Getters
  const currentUser = computed(() => authState.value?.currentUser);
  const isLoggedIn = computed(() => authState.value?.isLoggedIn);
  const isAdmin = computed(() => authState.value?.isAdmin);
  const id = computed(() => authState.value?.id);
  const image = computed(() => authState.value?.image);
  const name = computed(() => authState.value?.name);
  
  //----> Actions
  const login = (authStateRes: AuthState) => {
    console.log("In auth-store, authStateRes : ", authStateRes)
    updateAuthState(authStateRes);

  };

  const logout = () => {
    updateAuthState(new AuthState());
  };

  const editCurrentUser = (userPayload: UserPayload) => {
    authState.value = {...authState.value, currentUser: userPayload}
    setAuthLocal(authState.value)
  }

  const updateAuthState = (authStateNew: AuthState) => {
    authState.value = { ...authStateNew  } ;
    setAuthLocal(authStateNew);
  };

  const setAuthLocal = (authState: AuthState) =>{
    localStorage.setItem('auth', JSON.stringify(authState))
  }

  const getAuthLocal = () =>{
    const authStateString  =localStorage.getItem('auth');
    const authStateValue = JSON.parse(authStateString!) as AuthState;

    const authState = !!authStateValue? authStateValue : new AuthState();
    updateAuthState(authState);
  }

  return {
    currentUser,
    editCurrentUser,
    isAdmin,
    id,
    isLoggedIn,
    image,
    login,
    logout,
    name,
  };
});
