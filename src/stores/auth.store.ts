import { AuthState } from "@/states/authState";
import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";

export const useAuthStore = defineStore("auth", () => {
  //----> State
  const authState = ref<AuthState>({ ...new AuthState() });

  //----> Acts like a constructor
  onMounted(() => {
    const stateOfAuth = getLocalAuth();

    if (!!stateOfAuth) {
      authState.value = { ...stateOfAuth };
    }
  });

  //----> Getters

  const isLoggedIn = computed(() => authState.value?.isLoggedIn);
  const isAdmin = computed(() => authState.value?.isAdmin);
  const currentUser = computed(() => authState.value?.user);
  const token = computed(() => authState.value?.token);

  //----> Actions
  const login = (authStateRes: AuthState) => {
    updateAuthState(authStateRes);

    setLocalAuth(authStateRes);
  };

  const logout = () => {
    removeLocalAuth();

    updateAuthState(new AuthState());
  };

  const updateAuthState = (authStateNew: AuthState) => {
    authState.value = { ...authStateNew };
  };

  const setLocalAuth = (authState: AuthState) => {
    localStorage.setItem("auth", JSON.stringify(authState));
  };

  const getLocalAuth = (): AuthState => {
    return JSON.parse(localStorage.getItem("auth")!) as AuthState;
  };

  const removeLocalAuth = () => {
    localStorage.removeItem("auth");
  };

  return {
    isAdmin,
    isLoggedIn,
    currentUser,
    token,
    login,
    logout,
    getLocalAuth,
  };
});
