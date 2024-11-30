# **rg-mfe-overrides**

The **rg-mfe-overrides CLI** is a command-line tool designed to streamline the management of micro-frontends (MFEs). It simplifies handling override files, managing changes, and setting up development environments for MFEs.

---

## **Installation**

To integrate the CLI into your MFE project:

1. Add `rg-mfe-overrides` as a dependency in your `package.json`:

   ```json
   "dependencies": {
     "rg-mfe-overrides": "git+https://github.com/raccoongang/rg-mfe-overrides.git#<version>"
   }
   ```

2. Install the dependency:

   ```bash
   npm install
   ```

---

## **Available Commands**

### **1. Commit Changes**

Moves modified or newly added files into a specified directory, such as `frontend-build/overrides`. The CLI automatically organizes the directory structure based on your MFE.

#### **Usage**:
```bash
node ./node_modules/.bin/mfe-cli commit <path>
```

- `<path>`: Destination path where the changes should be committed (e.g., `frontend-build/overrides`).

#### **Example**:
```bash
node ./node_modules/.bin/mfe-cli commit ../frontend-build/overrides
```

---

### **2. List Changes**

Displays a list of all modified or added files in your MFE workspace before committing. This helps ensure accuracy and minimizes errors.

#### **Usage**:
```bash
node ./node_modules/.bin/mfe-cli list-changes
```

#### **Example**:
```bash
node ./node_modules/.bin/mfe-cli list-changes
```

---

### **3. Apply Overrides**

Copies or creates files from the `frontend-build/overrides` directory back into the working directory of your MFE. Useful for applying override changes.

#### **Usage**:
```bash
node ./node_modules/.bin/mfe-cli apply-overrides <path>
```

- `<path>`: Path to the override files you want to apply.

#### **Example**:
```bash
node ./node_modules/.bin/mfe-cli apply-overrides ../frontend-build/overrides
```

---

### **4. Install Frontend Build**

Clones a specified Git repository, removes the `node_modules` directory, and installs `@edx/frontend-build` from the local repository. This is useful for developing and testing changes in the frontend build directly.

#### **Usage**:
```bash
node ./node_modules/.bin/mfe-cli install-frontend-build <git_repo_url>
```

- `<git_repo_url>`: URL of the Git repository to clone.

#### **Example**:
```bash
node ./node_modules/.bin/mfe-cli install-frontend-build https://github.com/your-org/frontend-build.git
```

---
