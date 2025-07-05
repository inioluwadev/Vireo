export function Footer() {
  return (
    <footer className="py-6 border-t bg-secondary">
      <div className="container px-4 md:px-6 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Vireo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
