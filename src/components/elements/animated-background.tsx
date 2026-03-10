'use client';

import { Component, type ReactNode, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type UnicornSceneProps = {
  projectId: string;
  width: string;
  height: string;
};

type UnicornSceneComponent = (props: UnicornSceneProps) => ReactNode;

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Swallow runtime renderer errors from the external scene package and fallback.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function BackgroundFallback() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_38%,rgba(0,0,0,0.08)_100%)]" />
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.24),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_35%,rgba(255,255,255,0.04)_70%,transparent_100%)]" />
    </>
  );
}

export function AnimatedBackground({
  className,
  projectId,
}: {
  className: string;
  projectId: string;
}) {
  const [UnicornScene, setUnicornScene] = useState<UnicornSceneComponent | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    import('unicornstudio-react')
      .then((module) => {
        if (mounted) {
          setUnicornScene(() => module.default as UnicornSceneComponent);
        }
      })
      .catch(() => {
        if (mounted) {
          setLoadFailed(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div aria-hidden="true" data-project-id={projectId} className={cn('pointer-events-none', className)}>
      {UnicornScene && !loadFailed ? (
        <SceneErrorBoundary fallback={<BackgroundFallback />}>
          <UnicornScene projectId={projectId} width="100%" height="100%" />
        </SceneErrorBoundary>
      ) : (
        <BackgroundFallback />
      )}
    </div>
  );
}
