export const handleGoBack = () => {
  window.history.back();
};

export const handleGoHome = () => {
  window.location.href = '/';
};

export const handleGoLogin = () => {
  window.location.href = '/login';
};

export const handleGoAdmin = () => {
  window.location.href = '/admin/report-user';
};
