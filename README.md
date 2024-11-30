# rg-mfe-overrides


# **MFE CLI**

The **MFE CLI** is a command-line tool designed to streamline the management of micro-frontends (MFEs) in your projects. It simplifies the process of handling override files, managing changes, and setting up development environments for MFEs.

---

## **Installation**

To use the MFE CLI, install it globally using npm:

```bash
npm install -g mfe-overrides
```

---

## **Commands**

### **1. Commit Changes**

This command allows you to move modified or newly added files into a specified path. For example, you can specify `frontend-build/overrides` as the destination, and the CLI will automatically create the required directory structure based on the MFE you are working on.

#### **Usage**:
```bash
mfe-cli commit <path>
```

- `<path>`: The path where the changes should be committed (e.g., `frontend-build/overrides`).

#### **Example**:
```bash
mfe-cli commit frontend-build/overrides
```

This will transfer all modified or added files to the specified directory under `overrides`.

---

### **2. List Changes**

Before committing your changes, use this command to view a list of all modified or added files in your MFE. This helps ensure that the correct files are being transferred.

#### **Usage**:
```bash
mfe-cli list-changes
```

#### **Example**:
```bash
mfe-cli list-changes
```

This will display a list of all pending changes in your current MFE workspace.

---

### **3. Apply Overrides**

The `apply-overrides` command is the reverse of the `commit` process. It copies or creates the necessary files from the `overrides` directory back into the working directory of the specified MFE.

#### **Usage**:
```bash
mfe-cli apply-overrides <path>
```

- `<path>`: The path to the override files you want to apply.

#### **Example**:
```bash
mfe-cli apply-overrides frontend-build/overrides
```

This will copy all files from the `overrides` directory back into their corresponding locations within the MFE.

---

### **4. Install Frontend Build**

This command clones a specified Git repository, removes the `node_modules` directory, and installs `@edx/frontend-build` from the local repository. The CLI will also update your `package.json` file to point to the local version of the frontend build. This is useful for making and testing changes in the frontend build directly within your MFE.

#### **Usage**:
```bash
mfe-cli install-frontend-build <git_repo_url>
```

- `<git_repo_url>`: The URL of the Git repository to clone.

#### **Example**:
```bash
mfe-cli install-frontend-build https://github.com/your-org/frontend-build.git
```

This will:
1. Clone the specified repository.
2. Remove the `node_modules` directory.
3. Install `@edx/frontend-build` from the local repository.
4. Update `package.json` with the new local path.

---

## **How It Works**

1. **Commit:**
   Organizes override files for your MFE under the `frontend-build/overrides` directory with the correct directory structure.

2. **List Changes:**
   Allows you to preview modified or added files before committing them.

3. **Apply Overrides:**
   Copies override files from `frontend-build/overrides` into the relevant MFE directory.

4. **Install Frontend Build:**
   Simplifies the setup of `@edx/frontend-build` for local development and testing.

---

## **Contributing**

To contribute to this CLI tool:
1. Clone the repository.
2. Install the dependencies.
3. Submit your pull requests for any improvements or bug fixes.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

For further assistance, please refer to the project documentation or contact your team lead.
