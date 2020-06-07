import React from 'react';

export default function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = React.useState(null);

  React.useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
        console.log(stream);
      } catch (err) {
        console.error(err);
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}
