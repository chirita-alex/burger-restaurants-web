import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, render, act } from '@testing-library/react';
import { useOnVisible } from './useOnVisible';

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let triggerIntersection: (isIntersecting: boolean) => void;

beforeEach(() => {
  mockObserve.mockReset();
  mockDisconnect.mockReset();

  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) {
      triggerIntersection = (isIntersecting: boolean) =>
        callback([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const TestComponent = ({ onVisible }: { onVisible: () => void }) => {
  const ref = useOnVisible<HTMLDivElement>(onVisible);
  return <div ref={ref} />;
};

const renderWithRef = (onVisible: () => void) => render(<TestComponent onVisible={onVisible} />);

describe('useOnVisible', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useOnVisible(vi.fn()));
    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('current');
  });

  it('does not start observing when ref is not attached to a DOM element', () => {
    renderHook(() => useOnVisible(vi.fn()));
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('starts observing when the ref is attached to a DOM element', () => {
    renderWithRef(vi.fn());
    expect(mockObserve).toHaveBeenCalledTimes(1);
  });

  it('calls onVisible when the element becomes visible', () => {
    const onVisible = vi.fn();
    renderWithRef(onVisible);
    act(() => triggerIntersection(true));
    expect(onVisible).toHaveBeenCalledTimes(1);
  });

  it('does not call onVisible when the element is not intersecting', () => {
    const onVisible = vi.fn();
    renderWithRef(onVisible);
    act(() => triggerIntersection(false));
    expect(onVisible).not.toHaveBeenCalled();
  });

  it('disconnects after the element becomes visible', () => {
    renderWithRef(vi.fn());
    act(() => triggerIntersection(true));
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('disconnects on unmount', () => {
    const { unmount } = renderWithRef(vi.fn());
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
