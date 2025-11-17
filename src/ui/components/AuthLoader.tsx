import { SpinnerLoader } from '../../app/components';

export const AuthLoader = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mx-auto w-100 vh-100 animate__animated animate__fadeIn">
      <SpinnerLoader />
    </div>
  );
};
