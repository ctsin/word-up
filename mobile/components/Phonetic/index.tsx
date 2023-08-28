import { Button } from "react-native-paper";
import type { Props } from "react-native-paper/src/components/Button/Button";
import { Phonetic as PhoneticProps } from "@/interface/dictionary";
import { usePlayAudio } from "@/hooks/usePlayAudio";
import { GB } from "@/components/Flags/GB";
import { US } from "@/components/Flags/US";
import { isEmpty } from "lodash";
import { isUK, isUS } from "utils/isRegion";

export const Phonetic = ({ audio, text }: PhoneticProps) => {
  const { play, loading } = usePlayAudio();

  if (isEmpty(text)) return null;

  const commonProps: Pick<Props, "disabled"> = {
    disabled: loading,
  };

  if (isEmpty(audio)) {
    return <Button {...commonProps}>{text}</Button>;
  }

  const dimension = 14;
  const size = {
    width: dimension,
    height: dimension,
  } as const;

  return (
    <Button
      {...commonProps}
      onPress={play(audio)}
      icon={(props) =>
        isUK(audio) ? (
          <GB {...size} {...props} />
        ) : isUS(audio) ? (
          <US {...size} {...props} />
        ) : null
      }
    >
      {text}
    </Button>
  );
};
