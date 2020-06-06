import React from 'react';

export default function useOffsets(vWidth, vHeight, cWidth, cHeight) {
  const [offsets, setOffsets] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (vWidth && vHeight && cWidth && cHeight) {
      setOffsets({
        x: vWidth > cWidth ? Math.round((vWidth - cWidth) / 2) : 0,
        y: vHeight > cHeight ? Math.round((vHeight - cHeight) / 2) : 0,
      });
    }
  }, [vWidth, vHeight, cWidth, cHeight]);

  return offsets;
}
