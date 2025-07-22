
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingSkeleton } from '../LoadingSkeleton';

describe('LoadingSkeleton', () => {
  test('renders card skeleton by default', () => {
    render(<LoadingSkeleton />);
    // Check if skeleton elements are rendered
    const skeletons = document.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('renders specified number of skeletons', () => {
    const { container } = render(<LoadingSkeleton count={5} />);
    const skeletonContainers = container.children;
    expect(skeletonContainers).toHaveLength(5);
  });

  test('renders different skeleton types', () => {
    const types = ['card', 'list', 'table', 'form'] as const;
    
    types.forEach(type => {
      const { container } = render(<LoadingSkeleton type={type} />);
      const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
});
