import { Audio } from "expo-av";
import { isNull } from "lodash";
import { useEffect, useState } from "react";

export const usePlayAudio = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      isNull(sound)
        ? undefined
        : () => {
            sound.unloadAsync();
          },
    [sound]
  );

  const play = (audioURL: string) => {
    return async () => {
      setLoading(true);

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioURL },
        { shouldPlay: true }
      );
      setSound(sound);
      setLoading(false);

      await sound.playAsync();
    };
  };

  return { play, loading };
};
