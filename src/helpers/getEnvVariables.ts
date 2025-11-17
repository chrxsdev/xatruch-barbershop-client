interface EnvVariables {
  VITE_API_URL: string;
}

export const getEnvVariables = (): EnvVariables => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};
