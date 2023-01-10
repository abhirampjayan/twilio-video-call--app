export async function isPermissionDenied(name: 'camera' | 'microphone') {
  const permissionName = name as PermissionName; // workaround for https://github.com/microsoft/TypeScript/issues/33923

  if (navigator.permissions) {
    try {
      const result = await navigator.permissions.query({
        name: permissionName,
      });
      return result.state === 'denied';
    } catch {
      return false;
    }
  } else {
    return false;
  }
}
