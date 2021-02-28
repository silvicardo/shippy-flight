import React from "react";

export interface IRouteSearchFormProps {
  className?: string;
}

export const RouteSearchForm: React.FC<IRouteSearchFormProps> = ({ className = "", children }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default RouteSearchForm;
