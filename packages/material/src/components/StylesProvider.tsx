import React from "react";
import { StylesProviderProps } from "@material-ui/styles";
import { GenerateId } from "jss";
import { MuiStylesProvider, createGenerateClassName } from "..";

export type { StylesProviderProps } from "@material-ui/styles";

const StylesProvider: React.FunctionComponent<StylesProviderProps> = (
  props
) => {
  const [generateClassName, setGenerateClassName] = React.useState<{
    generateClassName: GenerateId;
  }>();

  const getRandomString = () =>
    Math.round((Math.random() + 1) * 1e16).toString(16);

  const getGenerateClassName = (): GenerateId => {
    return createGenerateClassName({
      disableGlobal: true,
      productionPrefix: getRandomString(),
      seed: getRandomString(),
    });
  };

  React.useEffect(() => {
    const generateClassName = getGenerateClassName();
    setGenerateClassName({ generateClassName });
  }, []);

  if (!generateClassName?.generateClassName) {
    return null;
  }

  return (
    <MuiStylesProvider
      generateClassName={generateClassName.generateClassName}
      {...props}
    />
  );
};

export default StylesProvider;
